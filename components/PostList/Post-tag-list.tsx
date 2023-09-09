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
    {tags.map((tag, index) => (
      <span
        key={`${tag}${index}`}
        className={tagCName}
      >
        #
        {tag}
      </span>
    ))}
  </div>
);

export default TagList;
