export type BoardMemberType = {
  name: string;
  role: string;
};

export type EventInfo = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  direction: 'left' | 'right';
};

export type AboutUs = {
  title: string;
  content: string;
};
