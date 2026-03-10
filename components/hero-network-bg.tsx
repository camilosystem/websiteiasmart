'use client'

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  pulse: number
  pulseSpeed: number
  icon: string
}

const ICONS = ['⬡', '◈', '◆', '▲', '●', '■']
const NODE_COUNT = 28
const CONNECTION_DIST = 180
const PULSE_ICONS = ['$', '★', '◎', '⊕', '↯']

export function HeroNetworkBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)
  const nodesRef = useRef<Node[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Primary color extracted from CSS variable (purple ~#7c3aed family)
    // We read it at runtime so it matches any editor override
    const computedPrimary = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary')
      .trim() || '0.55 0.24 280'

    // Use fixed rgba values derived from the design system purple
    const primaryRgb = { r: 124, g: 58, b: 237 }  // ~oklch 0.55 0.24 280
    const secondaryRgb = { r: 13, g: 90, b: 85 }   // ~oklch 0.25 0.15 180

    const toRgba = (c: { r: number; g: number; b: number }, a: number) =>
      `rgba(${c.r},${c.g},${c.b},${a})`

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    function initNodes() {
      const w = canvas!.offsetWidth
      const h = canvas!.offsetHeight
      nodesRef.current = Array.from({ length: NODE_COUNT }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 3 + Math.random() * 4,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        icon: PULSE_ICONS[i % PULSE_ICONS.length],
      }))
    }

    function draw() {
      if (!canvas || !ctx) return
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight

      ctx.clearRect(0, 0, W, H)

      const nodes = nodesRef.current

      // Update positions
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        n.pulse += n.pulseSpeed
        if (n.x < -20) n.x = W + 20
        if (n.x > W + 20) n.x = -20
        if (n.y < -20) n.y = H + 20
        if (n.y > H + 20) n.y = -20
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.35
            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y)
            grad.addColorStop(0, toRgba(primaryRgb, alpha))
            grad.addColorStop(1, toRgba(secondaryRgb, alpha))
            ctx.beginPath()
            ctx.strokeStyle = grad
            ctx.lineWidth = 1
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()

            // Animated data packet traveling along edge
            const t = (Math.sin(nodes[i].pulse) + 1) / 2
            const px = nodes[i].x + (nodes[j].x - nodes[i].x) * t
            const py = nodes[i].y + (nodes[j].y - nodes[i].y) * t
            ctx.beginPath()
            ctx.arc(px, py, 1.8, 0, Math.PI * 2)
            ctx.fillStyle = toRgba(primaryRgb, alpha * 2.5)
            ctx.fill()
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const glow = (Math.sin(n.pulse) + 1) / 2
        const outerR = n.radius + glow * 6

        // Glow halo
        const halo = ctx.createRadialGradient(n.x, n.y, n.radius * 0.5, n.x, n.y, outerR * 2)
        halo.addColorStop(0, toRgba(primaryRgb, 0.25 + glow * 0.2))
        halo.addColorStop(1, toRgba(primaryRgb, 0))
        ctx.beginPath()
        ctx.arc(n.x, n.y, outerR * 2, 0, Math.PI * 2)
        ctx.fillStyle = halo
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        const nodeGrad = ctx.createRadialGradient(n.x - n.radius * 0.3, n.y - n.radius * 0.3, 0, n.x, n.y, n.radius)
        nodeGrad.addColorStop(0, toRgba({ r: 167, g: 139, b: 250 }, 0.9))
        nodeGrad.addColorStop(1, toRgba(primaryRgb, 0.7))
        ctx.fillStyle = nodeGrad
        ctx.fill()
      }

      animFrameRef.current = requestAnimationFrame(draw)
    }

    resize()
    initNodes()
    draw()

    const resizeObserver = new ResizeObserver(() => {
      resize()
    })
    resizeObserver.observe(canvas)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.65 }}
    />
  )
}
