import React, { useContext } from "react";
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";

function PostCard({
	post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
	const { user } = useContext(AuthContext);

	return (
		<Card fluid>
			<Card.Content>
				<Image
					floated="right"
					size="mini"
					src="https://www.somagnews.com/wp-content/uploads/2020/03/d3-2-e1583519162281.jpg"
				/>
				<Card.Header>{username}</Card.Header>
				<Card.Meta as={Link} to={`/posts/${id}`}>
					{moment(createdAt).fromNow()}
				</Card.Meta>
				<Card.Description>{body}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<LikeButton user={user} post={{ id, likes, likeCount }} />
				<Button labelPosition="right" as={Link} to={`/posts/${id}`}>
					<Button icon>
						<Icon name="comment alternate" />
					</Button>
					<Label basic pointing="left">
						{commentCount}
					</Label>
				</Button>
				{user && user.username === username && (
					<Button
						as="div"
						color="red"
						floated="right"
						onClick={() => console.log("Delete post")}
					>
						<Icon name="trash" style={{ margin: 0 }} />
					</Button>
				)}
			</Card.Content>
		</Card>
	);
}

export default PostCard;
