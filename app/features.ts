// Флаги фич атласа. Ветка feature/body-view-only оставляет только отображение тела:
// 3D-сцену, камеру и выделение по клику. Чтобы вернуть фичу, поставь true.
export const FEATURES = {
  search: false,     // панель «Find a structure» и горячая клавиша «/»
  agentTools: false, // WebMCP-инструменты для ИИ-агентов в браузере
  explode: false,    // слайдер «Explode anatomy» (разобранный вид)
  details: false,    // боковая карточка структуры и «Isolate structure»
  systems: false,    // панель Systems: переключатели систем, пресеты All / Skeleton / Organs, «Hide all»
} as const;
