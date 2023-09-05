import { nanoid } from 'nanoid';

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
      index <= 2 && (
      <span key={nanoid(10)} className={tagCName}>
        #
        {tag}
            &nbsp;
      </span>
      )
    ))}
  </div>
);

export default TagList;
