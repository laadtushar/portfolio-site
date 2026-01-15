import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Post
 *
 *
 */
export interface Post extends SanityDocument {
  _type: "post";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Author — `reference`
   *
   *
   */
  author?: SanityReference<Author>;

  /**
   * Main image — `image`
   *
   *
   */
  mainImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Categories — `array`
   *
   *
   */
  categories?: Array<SanityKeyedReference<Category>>;

  /**
   * Published at — `datetime`
   *
   *
   */
  publishedAt?: string;

  /**
   * Body — `blockContent`
   *
   *
   */
  body?: BlockContent;
}

/**
 * Project
 *
 *
 */
export interface Project extends SanityDocument {
  _type: "project";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Short Title — `string`
   *
   *
   */
  shortTitle?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Subtitle — `string`
   *
   *
   */
  subTitle?: string;

  /**
   * Client — `string`
   *
   *
   */
  client?: string;

  /**
   * Designers — `array`
   *
   *
   */
  designers?: Array<
    SanityKeyed<{
      _type: "designer";
      /**
       * Name — `string`
       *
       *
       */
      name?: string;

      /**
       * URL — `url`
       *
       *
       */
      url?: string;
    }>
  >;

  /**
   * Links — `array`
   *
   *
   */
  links?: Array<
    SanityKeyed<{
      _type: "link";
      /**
       * Text — `string`
       *
       *
       */
      text?: string;

      /**
       * URL — `url`
       *
       *
       */
      url?: string;
    }>
  >;

  /**
   * Body — `blockContent`
   *
   *
   */
  body?: BlockContent;

  /**
   * Highlight Color — `color`
   *
   *
   */
  color1?: Color;
}

/**
 * Work Experience
 *
 *
 */
export interface Experience extends SanityDocument {
  _type: "experience";

  /**
   * Company Name — `string`
   *
   *
   */
  company?: string;

  /**
   * Role/Title — `string`
   *
   *
   */
  role?: string;

  /**
   * Start Date — `date`
   *
   *
   */
  startDate?: string;

  /**
   * End Date — `date`
   *
   * Leave empty if currently working here
   */
  endDate?: string;

  /**
   * Current Position — `boolean`
   *
   * Check if this is your current position
   */
  current?: boolean;

  /**
   * Location — `string`
   *
   *
   */
  location?: string;

  /**
   * Description — `array`
   *
   * Key responsibilities and achievements
   */
  description?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Technologies Used — `array`
   *
   * List of technologies, tools, and frameworks used
   */
  technologies?: Array<SanityKeyed<string>>;

  /**
   * Company Website — `url`
   *
   *
   */
  companyUrl?: string;

  /**
   * Company Logo — `image`
   *
   *
   */
  logo?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Display Order — `number`
   *
   * Lower numbers appear first (0 = most recent)
   */
  order?: number;
}

/**
 * Author
 *
 *
 */
export interface Author extends SanityDocument {
  _type: "author";

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Bio — `array`
   *
   *
   */
  bio?: Array<SanityKeyed<SanityBlock>>;
}

/**
 * Category
 *
 *
 */
export interface Category extends SanityDocument {
  _type: "category";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Description — `text`
   *
   *
   */
  description?: string;
}

export type ImageFigure = {
  _type: "imageFigure";
  /**
   * Image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Alt text — `string`
   *
   *
   */
  alt?: string;
};

export type VideoFigure = {
  _type: "videoFigure";
  /**
   * Video — `file`
   *
   *
   */
  video?: { _type: "file"; asset: SanityReference<any> };

  /**
   * Alt text — `string`
   *
   *
   */
  alt?: string;

  /**
   * Thumbnail — `image`
   *
   *
   */
  thumbnail?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
};

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<ImageFigure>
  | SanityKeyed<Youtube>
  | SanityKeyed<Vimeo>
  | SanityKeyed<Code>
  | SanityKeyed<{
      _type: "quote";
      /**
       * Quote — `string`
       *
       *
       */
      quote?: string;

      /**
       * Author — `string`
       *
       *
       */
      author?: string;

      /**
       * Title — `string`
       *
       *
       */
      title?: string;

      /**
       * Headshot — `image`
       *
       *
       */
      headshot?: {
        _type: "image";
        asset: SanityReference<SanityImageAsset>;
        crop?: SanityImageCrop;
        hotspot?: SanityImageHotspot;
      };
    }>
  | SanityKeyed<{
      _type: "link";
      /**
       * URL — `url`
       *
       *
       */
      url?: string;

      /**
       * Text — `string`
       *
       *
       */
      text?: string;
    }>
>;

export type Youtube = {
  _type: "youtube";
  /**
   * Youtube ID — `string`
   *
   *
   */
  id?: string;
};

export type Vimeo = {
  _type: "vimeo";
  /**
   * Vimeo ID — `string`
   *
   *
   */
  id?: string;
};

export type Documents = Post | Project | Experience | Author | Category;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Color = any;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Code = any;
