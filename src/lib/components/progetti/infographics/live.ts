/**
 * Azione condivisa dalle infografiche: dice al componente se è in vista e se chi guarda
 * ha chiesto meno movimento. Le animazioni partono solo quando serve, fuori vista costano zero.
 */
export interface LiveState {
  visible: boolean;
  reduced: boolean;
}

export function live(node: HTMLElement, onChange: (state: LiveState) => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;

  const emit = () => onChange({ visible, reduced: mq.matches });

  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      emit();
    },
    { threshold: 0.15 }
  );

  io.observe(node);
  mq.addEventListener('change', emit);
  emit();

  return {
    destroy() {
      io.disconnect();
      mq.removeEventListener('change', emit);
    },
  };
}
