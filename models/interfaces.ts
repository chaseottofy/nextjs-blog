export interface NavbarButtonProps {
  btnName: string;
  btnClass: string;
  setActive: (name: string) => void;
  setOffsets: (left: number, width: number) => void;
}

export type postParams = {
  slug: string;
};

export type MetadataProps = {
  params: postParams;
};
