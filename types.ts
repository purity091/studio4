
export interface Point {
  id: string;
  title: string;
  description: string;
  icon: string;
  angle: number;
}

export interface Slide {
  id: string;
  header: string;
  subHeader: string;
  mainImageUrl: string;
  logoUrl?: string;
  accentColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  customCSS: string;
  points: Point[];
}

export interface Project {
  title: string;
  slides: Slide[];
}

export interface ColorTheme {
  name: string;
  primary: string;
  secondary: string;
  bg: string;
  text: string;
}
