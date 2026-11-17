import Image from "next/image";
import LinkCard from "@/components/LinkCard";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

// wireframe.png 구성: 원형 프로필 사진 → 이름 → 한 줄 소개 → 링크 카드 3개(세로)
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center sm:p-8">
      {/* 모바일에서는 화면 전체, 큰 화면에서는 휴대폰 모양 프레임 */}
      <div className="relative flex min-h-screen w-full max-w-sm flex-col items-center px-6 py-14 sm:min-h-[720px] sm:rounded-[2.5rem] sm:border-2 sm:border-zinc-800 sm:bg-white sm:shadow-xl dark:sm:border-zinc-700 dark:sm:bg-zinc-900">
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>

        {/* 프로필 */}
        <Image
          src={profile.image}
          alt={`${profile.name} 프로필 사진`}
          width={192}
          height={192}
          priority
          unoptimized
          className="h-48 w-48 rounded-full border-2 border-zinc-800 object-cover dark:border-zinc-200"
        />
        <h1 className="mt-6 text-xl font-bold">{profile.name}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{profile.bio}</p>

        {/* 링크 카드 목록 */}
        <nav aria-label="링크 목록" className="mt-10 flex w-full flex-col gap-6">
          {profile.links.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </nav>
      </div>
    </main>
  );
}
