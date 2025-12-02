export interface Link {
  href: string;
  title: string;
  description?: string;
  /**
   * Can be:
   * - An emoji: "📋"
   * - A URL to an image: "/icons/jira.svg" or "https://..."
   * - A devicon: "devicon/github-original" or "devicon/react-original-wordmark"
   *   For -original variants, SVG images are used (colored)
   *   For -plain/-line variants, the font icon is used
   *   See https://devicon.dev for available icons
   */
  icon?: string;
  category?: string;
  /**
   * Optional tags for filtering and categorization.
   * Tags are displayed as chips and can be clicked to filter links.
   */
  tags?: string[];
}
