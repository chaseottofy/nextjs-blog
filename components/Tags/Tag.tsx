interface TagComponentProps {
  tag: string;
  count: number;
  onTagClick: (tag: string) => void;
  tagClassName?: string;
}

const Tag: React.FC<TagComponentProps> = ({
  tag, count, onTagClick, tagClassName,
}) => (
  <button
    onClick={() => onTagClick(tag)}
    className={tagClassName}
    type='button'
  >
    <span>
      {tag}
&nbsp;
    </span>
    <span>{count}</span>
  </button>
);

export default Tag;
