import Image from "next/image";
import LinkCard from "@/components/LinkCard";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

// wireframe.png 구성: 원형 프로필 사진 → 이름 → 한 줄 소개 → 링크 카드 3개(세로)
export default function Home() {
  return (
    // 크림색 → 연한 살구색 그라데이션 배경
    <main className="relative min-h-[100dvh] bg-gradient-to-b from-cream via-[#FFEFE3] to-apricot px-6 dark:from-ember-900 dark:via-ember-900 dark:to-ember-800 sm:px-8">
      <div className="absolute right-5 top-5 sm:right-8 sm:top-8">
        <ThemeToggle />
      </div>

      <div className="mx-auto flex w-full max-w-[26rem] flex-col items-center pb-16 pt-20 sm:pt-28">
        {/* 프로필 */}
        <Image
          src={profile.image}
          alt={`${profile.name} 프로필 사진`}
          width={240}
          height={240}
          priority
          unoptimized
          className="h-28 w-28 rounded-full object-cover shadow-[0_12px_32px_-12px_rgba(120,60,20,0.45)] ring-4 ring-white/90 dark:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.8)] dark:ring-white/10 sm:h-32 sm:w-32"
        />
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">{profile.name}</h1>
        <p className="mt-2 text-[15px] text-stone-500 dark:text-stone-400">{profile.bio}</p>

        {/* 링크 카드 목록 */}
        <nav aria-label="링크 목록" className="mt-12 flex w-full flex-col gap-4">
          {profile.links.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </nav>
      </div>
    </main>
  );
}
