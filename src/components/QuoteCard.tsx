import { Quote } from '../types';
import { Quote as QuoteIcon, Image as ImageIcon, RefreshCw, ExternalLink, Sparkles, Loader2 } from 'lucide-react';

interface QuoteCardProps {
  quote: Quote | null;
  isGenerating: boolean;
  isGeneratingCard: boolean;
  generationStep?: 'quote' | 'explanation' | 'card' | null;
  cardProgress?: number;
  onGenerateCard: () => void;
  onRefresh: () => void;
  onShare: () => void;
  t: (key: string) => string;
}

// Skeleton component with shimmer effect
function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded ${className}`}>
      <div className="h-full w-full bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700 animate-shimmer bg-[length:200%_100%]" />
    </div>
  );
}

// Skeleton for quote card during generation
function QuoteSkeleton({ t }: { t: (key: string) => string }) {
  return (
    <div className="relative bg-white dark:bg-neutral-900 rounded-[2rem] p-8 shadow-sm border border-neutral-100 dark:border-neutral-800 overflow-hidden min-h-[400px] flex flex-col justify-center">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />

      {/* Quote text skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/4 ml-auto" />

        {/* Divider */}
        <div className="border-t border-neutral-50 dark:border-neutral-800 pt-6 mt-6">
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Button skeletons */}
        <div className="pt-6 space-y-3">
          <Skeleton className="h-12 w-full rounded-xl" />
          <div className="flex gap-2">
            <Skeleton className="h-12 flex-1 rounded-xl" />
            <Skeleton className="h-12 flex-1 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Generation progress indicator */}
      <div className="absolute bottom-4 left-8 right-8">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{t('home.generating')}</span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton for card generation only
function CardGenerationSkeleton({ t, progress }: { t: (key: string) => string; progress?: number }) {
  return (
    <div className="relative bg-white dark:bg-neutral-900 rounded-[2rem] p-8 shadow-sm border border-neutral-100 dark:border-neutral-800 overflow-hidden min-h-[400px] flex flex-col justify-center transition-colors">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />

      <QuoteIcon className="w-10 h-10 text-indigo-100 dark:text-indigo-900/30 absolute top-8 left-8 -z-0" />
      <div className="relative z-10">
        <p className="text-2xl font-serif leading-snug text-neutral-800 dark:text-neutral-100 mb-4">
          "제목"
        </p>
        <p className="text-neutral-500 dark:text-neutral-400 font-medium text-right">— 저자</p>
      </div>

      <div className="pt-6 border-t border-neutral-50 dark:border-neutral-800">
        <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">{t('home.ai_explanation')}</h4>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
          설명 텍스트
        </p>
      </div>

      {/* Card generation progress */}
      <div className="pt-4">
        <button
          disabled
          className="w-full py-3 px-4 bg-indigo-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          {t('home.generating_card')}
        </button>

        {/* Progress bar */}
        {(progress !== undefined) && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-neutral-500 mb-1">
              <span>{t('home.generating_card')}</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-3">
          <button
            disabled
            className="flex-1 py-3 px-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-100 dark:border-neutral-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 opacity-50"
          >
            <RefreshCw className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            {t('home.refresh')}
          </button>
          <button
            disabled
            className="flex-1 py-3 px-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-100 dark:border-neutral-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 opacity-50"
          >
            <ExternalLink className="w-4 h-4" />
            {t('share.button')}
          </button>
        </div>
      </div>
    </div>
  );
}

export function QuoteCard({
  quote,
  isGenerating,
  isGeneratingCard,
  generationStep,
  cardProgress,
  onGenerateCard,
  onRefresh,
  onShare,
  t,
}: QuoteCardProps) {
  // Show skeleton during quote generation
  if (isGenerating) {
    return <QuoteSkeleton t={t} />;
  }

  // Show card generation progress
  if (isGeneratingCard && quote) {
    return (
      <CardGenerationSkeleton
        t={t}
        progress={cardProgress}
      />
    );
  }

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