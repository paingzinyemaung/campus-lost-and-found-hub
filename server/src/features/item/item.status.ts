export const ITEM_STATUSES = ['LOST', 'FOUND', 'RESOLVED'] as const;

export const isValidStatus = (
  value: unknown,
): value is (typeof ITEM_STATUSES)[number] =>
  typeof value === 'string' &&
  (ITEM_STATUSES as readonly string[]).includes(value);

type StatusState = { status: string; previousStatus: string | null };

export function resolveStatusChange(
  current: StatusState,
  nextStatus: string,
): StatusState {
  // LOST/FOUND -> RESOLVED : မူလ status ကို မှတ်ထားမယ်
  if (nextStatus === 'RESOLVED' && current.status !== 'RESOLVED') {
    return { status: 'RESOLVED', previousStatus: current.status };
  }

  // RESOLVED -> ပြန်ဖွင့် : မှတ်ထားတာကို ပြန်ထားမယ်
  if (current.status === 'RESOLVED' && nextStatus !== 'RESOLVED') {
    return {
      status: current.previousStatus ?? nextStatus,
      previousStatus: null,
    };
  }

  // ကျန်တာ မပြောင်းဘူး
  return { status: nextStatus, previousStatus: current.previousStatus };
}
