import React from "react";
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

function PostCard({
	post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {

    function likePost() {
        console.log("Post liked");
    }

    function commentOnPost() {
        console.log("Post comment");
    }

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
				<Button as="div" labelPosition="right" onClick={likePost}>
					<Button icon>
						<Icon name="heart" />
					</Button>
					<Label basic pointing="left">
						{likeCount}
					</Label>
				</Button>
                <Button as="div" labelPosition="right" onClick={commentOnPost}>
					<Button icon>
						<Icon name="comment alternate" />
					</Button>
					<Label basic pointing="left">
						{commentCount}
					</Label>
				</Button>
			</Card.Content>
		</Card>
	);
}

export default PostCard;
