'use client';

import { useEffect } from 'react';

// Rounded text selection. ::selection can't take border-radius, so the native highlight is made
// transparent (only while this runs, see base.css) and one rounded pill per selected line is drawn
// in a layer blended over the page. Pills sit in document coordinates, so scrolling needs no work.
const PAD_X = 3;
const PAD_Y = 1;
const GAP = 3; // px between stacked line pills
const MAX_NODES = 1500; // huge select-alls fall back to fewer pills rather than stalling

function lineRects(range) {
  const rects = [];
  const root = range.commonAncestorContainer;
  const walker = document.createTreeWalker(
    root.nodeType === Node.TEXT_NODE ? root.parentNode : root,
    NodeFilter.SHOW_TEXT,
  );
  const part = document.createRange();
  let n = 0;
  for (let node = walker.nextNode(); node && n < MAX_NODES; node = walker.nextNode()) {
    if (!range.intersectsNode(node) || !node.data.trim()) continue;
    n++;
    part.selectNodeContents(node);
    if (node === range.startContainer) part.setStart(node, range.startOffset);
    if (node === range.endContainer) part.setEnd(node, range.endOffset);
    for (const r of part.getClientRects()) if (r.width > 0.5 && r.height > 0) rects.push(r);
  }

  // merge fragments that share a line and nearly touch; a wide gap (another column) stays separate
  rects.sort((a, b) => a.top - b.top || a.left - b.left);
  const lines = [];
  for (const r of rects) {
    const last = lines[lines.length - 1];
    const sameLine = last && Math.min(last.bottom, r.bottom) - Math.max(last.top, r.top) > Math.min(last.bottom - last.top, r.height) / 2;
    if (sameLine && r.left - last.right < 24) {
      last.left = Math.min(last.left, r.left);
      last.right = Math.max(last.right, r.right);
      last.top = Math.min(last.top, r.top);
      last.bottom = Math.max(last.bottom, r.bottom);
    } else {
      lines.push({ left: r.left, right: r.right, top: r.top, bottom: r.bottom });
    }
  }
  return lines;
}

export default function SelectionHighlight() {
  useEffect(() => {
    const layer = document.createElement('div');
    layer.className = 'sel-layer';
    layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);
    document.documentElement.classList.add('sel-rounded');

    let raf = 0;
    const paint = () => {
      raf = 0;
      const sel = document.getSelection();
      const active = document.activeElement;
      // inputs and textareas keep the native highlight (their text has no DOM ranges to measure)
      if (!sel || sel.isCollapsed || !sel.rangeCount || active?.matches?.('input, textarea')) {
        layer.replaceChildren();
        return;
      }
      const sx = window.scrollX, sy = window.scrollY;
      const boxes = lineRects(sel.getRangeAt(0)).map((l) => ({
        left: l.left - PAD_X, right: l.right + PAD_X, top: l.top - PAD_Y, bottom: l.bottom + PAD_Y,
      }));
      // tight line-heights (big headings) make line boxes overlap; split them so each line is its own pill
      for (let i = 1; i < boxes.length; i++) {
        const a = boxes[i - 1], b = boxes[i];
        if (b.top < a.bottom + GAP && b.left < a.right && b.right > a.left) {
          const mid = (a.bottom + b.top) / 2;
          a.bottom = mid - GAP / 2;
          b.top = mid + GAP / 2;
        }
      }
      const pills = boxes.map((b) => {
        const el = document.createElement('span');
        el.style.cssText = `left:${b.left + sx}px;top:${b.top + sy}px;width:${b.right - b.left}px;height:${b.bottom - b.top}px`;
        return el;
      });
      layer.replaceChildren(...pills);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(paint); };

    document.addEventListener('selectionchange', schedule);
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('selectionchange', schedule);
      window.removeEventListener('resize', schedule);
      document.documentElement.classList.remove('sel-rounded');
      layer.remove();
    };
  }, []);

  return null;
}
