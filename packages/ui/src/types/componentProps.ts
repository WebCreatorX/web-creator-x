//노드의 타입별로 달라지는 props의 타입을 정의.

// 1. Hero 컴포넌트 Props
export interface HeroProps {
  heading: string;
  subHeading?: string;
  button?: {
    text: string;
    link: string;
  };

  //만약 사진이 없다면 null을 입력 해야합니다.
  image?: {
    url: string;
    alt?: string;
  };
}
// 2. Image 컴포넌트 Props
export interface ImageProps {
  src: string;
  alt?: string;
  caption?: string;
}

// 3. Heading 컴포넌트 Props
export interface HeadingProps {
  text: string;
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

// 4. Button 컴포넌트 Props
// 클릭 이벤트도 들어가야 하는거 아닌가?
export interface ButtonProps {
  text: string;
  link: string;
  target?: "_blank" | "_self";
}

// 5. Container 컴포넌트 Props (보통 비어있거나 ID 정도만 가짐)
export interface ContainerProps {
  id?: string;
  tagName?: "div" | "section" | "article";
}
