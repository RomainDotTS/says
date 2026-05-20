import { Link } from "@tanstack/react-router";

export interface ArticleMetadata {
  title: string;
  description: string;
  date: string;
  linkedTo : string;
}

export default function PostContainer({title, description, date, linkedTo}: ArticleMetadata) {
    return(
        <article className="article">
            <Link to="/posts/$postId" params={{ postId: linkedTo }} viewTransition= {{ types: ["forward"] }}>
                <h3>{title}</h3>
            </Link>
            <p>{description}</p>
            <time dateTime={date}>{date}</time>
        </article>
)}
