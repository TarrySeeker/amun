"use client";

interface ReviewsStubProps {
  rating: number;
  reviewsCount: number;
}

const starDistribution = [
  { stars: 5, percent: 62 },
  { stars: 4, percent: 24 },
  { stars: 3, percent: 9 },
  { stars: 2, percent: 3 },
  { stars: 1, percent: 2 },
];

const mockReviews = [
  {
    name: "Алексей К.",
    date: "15 марта 2026",
    rating: 5,
    text: "Отличное качество! Пользуюсь уже несколько месяцев, никаких нареканий. Рекомендую.",
  },
  {
    name: "Дмитрий В.",
    date: "2 февраля 2026",
    rating: 4,
    text: "Хороший товар за свои деньги. Доставка была быстрой. Немного не хватает инструкции по использованию.",
  },
  {
    name: "Сергей М.",
    date: "18 января 2026",
    rating: 5,
    text: "Брал для охоты — очень доволен. Качество материалов на высоте, всё продумано до мелочей.",
  },
];

export default function ReviewsStub({ rating, reviewsCount }: ReviewsStubProps) {
  return (
    <div className="max-w-3xl">
      {/* Rating summary */}
      <div className="flex gap-8 mb-10">
        {/* Big rating number */}
        <div className="flex flex-col items-center gap-1">
          <span
            className="text-5xl font-black text-[#f0ece4]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            {rating}
          </span>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(rating) ? "text-[#c49a3c]" : "text-[#2a2a2a]"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-[#6b6055]">{reviewsCount} отзывов</span>
        </div>

        {/* Star distribution bars */}
        <div className="flex-1 flex flex-col gap-2 justify-center">
          {starDistribution.map((row) => (
            <div key={row.stars} className="flex items-center gap-3">
              <span className="text-xs text-[#6b6055] w-12">{row.stars} ★</span>
              <div className="flex-1 h-2 bg-[#1e1e1e] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#c49a3c] rounded-full"
                  style={{ width: `${row.percent}%` }}
                />
              </div>
              <span className="text-xs text-[#6b6055] w-8 text-right">
                {row.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mock reviews */}
      <div className="flex flex-col gap-6">
        {mockReviews.map((review, index) => (
          <div
            key={index}
            className="border border-[#1e1e1e] p-5 bg-[#111]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#5c7a3e] flex items-center justify-center text-white text-sm font-bold rounded-full">
                  {review.name[0]}
                </div>
                <div>
                  <span className="text-sm text-[#f0ece4] font-medium">
                    {review.name}
                  </span>
                  <span className="block text-xs text-[#6b6055]">
                    {review.date}
                  </span>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < review.rating ? "text-[#c49a3c]" : "text-[#2a2a2a]"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-sm text-[#9a8f80] leading-relaxed">
              {review.text}
            </p>
          </div>
        ))}
      </div>

      {/* Write review button */}
      <button
        disabled
        className="mt-8 w-full border border-[#2a2a2a] text-[#5a5048] py-3 text-sm uppercase tracking-widest cursor-not-allowed"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        Написать отзыв
      </button>
    </div>
  );
}
