interface TagListProps {
  tags: string[];
  wrapperCName: string;
  tagCName: string;
}

const TagList: React.FC<TagListProps> = ({
  tags,
  wrapperCName,
  tagCName,
}) => (
  <div className={wrapperCName}>
    {tags.map((tag) => (
      <span
        key={`${tag}TL`}
        className={tagCName}
      >
        #
        {tag}
      </span>
    ))}
  </div>
);

export default TagList;
