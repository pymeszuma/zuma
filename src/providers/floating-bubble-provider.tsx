'use client';

import { FloatingBubble } from '@/components/common/floating-bubble';

interface FloatingBubbleProviderProps {
  iframeUrl: string;
  dialogTitle?: string;
}

export function FloatingBubbleProvider({
  iframeUrl,
  dialogTitle
}: FloatingBubbleProviderProps) {
  return <FloatingBubble iframeUrl={iframeUrl} dialogTitle={dialogTitle} />;
}
