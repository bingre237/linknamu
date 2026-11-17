export type LinkItem = {
  id: string;
  title: string;
  description?: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  image: string;
  links: LinkItem[];
};

// 보여 주기용 더미 데이터입니다. 실제 값으로 바꿀 때는 이 파일만 고치면 됩니다.
export const profile: Profile = {
  name: "빙그레화인쿨",
  bio: "세계 최강 바이브코더",
  image: "/profile.svg",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com/" },
    { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/" },
    { id: "blog", title: "Blog", url: "https://example.com/" },
  ],
};
