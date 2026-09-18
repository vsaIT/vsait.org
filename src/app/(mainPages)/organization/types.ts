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
  heading: string;
  content: string;
};

export type FocusArea = {
  title: string;
  description: string;
  iconSrc: string;
  iconAlt: string;
  iconWidth: number;
  iconHeight: number;
};

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
};
