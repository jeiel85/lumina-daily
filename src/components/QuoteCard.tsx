import { Quote } from '../types';
import { Quote as QuoteIcon, Image as ImageIcon, RefreshCw, ExternalLink, Sparkles } from 'lucide-react';

interface QuoteCardProps {
  quote: Quote | null;
  isGenerating: boolean;
  isGeneratingCard: boolean;
  onGenerateCard: () => void;
  onRefresh: () => void;
  onShare: () => void;
  t: (key: string) => string;
}

export function QuoteCard({
  quote,
  isGenerating,
  isGeneratingCard,
  onGenerateCard,
  onRefresh,
  onShare,
  t,
}: QuoteCardProps) {
  return (
    <div className="relative bg-white dark:bg-neutral-900 rounded-[2rem] p-8 shadow-sm border border-neutral-100 dark:border-neutral-800 overflow-hidden min-h-[400px] flex flex-col justify-center transition-colors">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
      
      {quote ? (
        <>
          <QuoteIcon className="w-10 h-10 text-indigo-100 dark:text-indigo-900/30 absolute top-8 left-8 -z-0" />
          <div className="relative z-10">
            <p className="text-2xl font-serif leading-snug text-neutral-800 dark:text-neutral-100 mb-4">
              "{quote.text}"
            </p>
            <p className="text-neutral-500 dark:text-neutral-400 font-medium text-right">— {quote.author}</p>
          </div>
          
          <div className="pt-6 border-t border-neutral-50 dark:border-neutral-800">
            <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">{t('home.ai_explanation')}</h4>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
              {quote.explanation}
            </p>
          </div>

          <div className="pt-4 flex flex-col gap-2">
            <button
              onClick={onGenerateCard}
              disabled={isGeneratingCard || isGenerating}
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50 transition-all"
            >
              {isGeneratingCard ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
              {t('home.generate_card')}
            </button>
            <div className="flex gap-2">
              <button
                onClick={onRefresh}
                disabled={isGenerating}
                className="flex-1 py-3 px-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-100 dark:border-neutral-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-700 disabled:opacity-50 transition-all"
              >
                <RefreshCw className={`w-4 h-4 text-indigo-600 dark:text-indigo-400 ${isGenerating ? 'animate-spin' : ''}`} />
                {t('home.refresh')}
              </button>
              <button
                onClick={onShare}
                className="flex-1 py-3 px-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-100 dark:border-neutral-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                {t('share.button')}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-neutral-50 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8 text-neutral-200 dark:text-neutral-700" />
          </div>
          <p className="text-neutral-400 dark:text-neutral-500">{t('home.no_quote')}</p>
        </div>
      )}
    </div>
  );
}