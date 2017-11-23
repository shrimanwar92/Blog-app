import { Router, Request, Response, NextFunction } from 'express';
import Post from '../models/Post';

class PostRouter {
	router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	GetPosts(req: Request, res: Response): void {
		Post.find({}).then(data => {
			const status = res.statusCode;
			res.json({ status, data });
		}).catch(err => {
			const status = res.statusCode;
			res.json({ status, err });
		});
	}

	GetPost(req: Request, res: Response): void {
		const slug: string = req.params.slug;

		Post.findOne({ slug }).then(data => {
			const status = res.statusCode;
			res.json({ status, data });
		}).catch(err => {
			const status = res.statusCode;
			res.json({ status, err });
		})
	}

	CreatePost(req: Request, res: Response): void {
		const title: string = req.body.title;
		const slug: string = req.body.slug;
		const content: string = req.body.content;
		const featuredImage: string = req.body.featuredImage;

		const post = new Post({
			title,
			slug,
			content,
			featuredImage
		});

		post.save().then(data => {
			const status = res.statusCode;
			res.json({ status, data });
		}).catch(err => {
			const status = res.statusCode;
			res.json({ status, err });
		})
	}

	UpdatePost(req: Request, res: Response): void {
		const slug: string = req.params.slug;

		Post.findOneAndUpdate({ slug }, req.body).then(data => {
			const status = res.statusCode;
			res.json({ status, data });
		}).catch(err => {
			const status = res.statusCode;
			res.json({ status, err });
		})
	}

	DeletePost(req: Request, res: Response): void {
		const slug: string = req.params.slug;

		Post.findOneAndRemove({ slug }).then(data => {
			const status = res.statusCode;
			res.json({ status, data });
		}).catch(err => {
			const status = res.statusCode;
			res.json({ status, err });
		})
	}

	routes() {
		this.router.get('/', this.GetPosts);
		this.router.get('/:slug', this.GetPost);
		this.router.post('/', this.CreatePost);
		this.router.put('/:slug', this.UpdatePost);
		this.router.delete('/:slug', this.DeletePost);
	}
}

// export
const postRoutes: PostRouter = new PostRouter();
postRoutes.routes();

export default postRoutes.router;