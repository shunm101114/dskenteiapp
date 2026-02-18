import { useRegisterSW } from 'virtual:pwa-register/react'

export function ReloadPrompt() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW()

  if (!needRefresh) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        right: 16,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '12px 16px',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        boxShadow: 'var(--shadow-md)',
        fontFamily: 'var(--font-ja)',
        fontSize: 14,
        color: 'var(--color-text)',
      }}
    >
      <span>新しいバージョンがあります</span>
      <button
        onClick={() => updateServiceWorker(true)}
        type="button"
        style={{
          flexShrink: 0,
          padding: '6px 16px',
          background: 'var(--color-primary)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          fontSize: 14,
          fontFamily: 'var(--font-ja)',
          cursor: 'pointer',
        }}
      >
        更新する
      </button>
    </div>
  )
}
