import { Quote } from '../types';
import { Download, ExternalLink, RefreshCw } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import { Capacitor } from '@capacitor/core';

interface HistoryItemProps {
  quote: Quote;
  onSelect: () => void;
  onDownload: () => void;
  onShare: () => void;
  onRegenerate: () => void;
  t: (key: string) => string;
}

export function HistoryItem({
  quote,
  onSelect,
  onDownload,
  onShare,
  onRegenerate,
  t,
}: HistoryItemProps) {
  return (
    <div 
      className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm space-y-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors group"
    >
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded">
          {t(`themes.${quote.theme}`)}
        </span>
        <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
          {quote.createdAt instanceof Timestamp ? quote.createdAt.toDate().toLocaleDateString() : t('history.just_now')}
        </span>
      </div>
      
      {quote.imageUrl && (
        <div className="space-y-2">
          <div className="aspect-square rounded-xl overflow-hidden shadow-inner bg-neutral-100 dark:bg-neutral-800">
            <img src={quote.imageUrl} alt="Quote Card" className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (Capacitor.isNativePlatform()) {
                  import('@capacitor/filesystem').then(async ({ Filesystem, Directory }) => {
                    const { Share } = await import('@capacitor/share');
                    const res = await fetch(quote.imageUrl!);
                    const blob = await res.blob();
                    const reader = new FileReader();
                    reader.onloadend = async () => {
                      const base64Data = (reader.result as string).replace(/^data:image\/jpeg;base64,/, '');
                      const fileName = `quote-${quote.id}.jpg`;
                      await Filesystem.writeFile({ path: fileName, data: base64Data, directory: Directory.Cache });
                      const { uri } = await Filesystem.getUri({ path: fileName, directory: Directory.Cache });
                      try {
                        await Share.share({ url: uri });
                      } catch {
                        // 취소는 에러 아님
                      }
                    };
                    reader.readAsDataURL(blob);
                  });
                } else {
                  const link = document.createElement('a');
                  link.download = `quote-${quote.id}.jpg`;
                  link.href = quote.imageUrl!;
                  link.click();
                }
              }}
              className="py-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-[10px] font-semibold">{t('history.download')}</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare();
              }}
              className="py-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-[10px] font-semibold">{t('share.button')}</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRegenerate();
              }}
              className="py-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-[10px] font-semibold">{t('history.regenerate')}</span>
            </button>
          </div>
        </div>
      )}

      <div onClick={onSelect} className="cursor-pointer">
        <p className="text-neutral-800 dark:text-neutral-200 font-medium line-clamp-2">"{quote.text}"</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">— {quote.author}</p>
      </div>
    </div>
  );
}