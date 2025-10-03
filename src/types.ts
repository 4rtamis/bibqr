export type Source = {
  id: string;
  citationChicago: string; // preformatted Chicago-style citation
  tags: string[];
  description?: string;
  link?: string; // where to get it
  recommended?: boolean;
};
