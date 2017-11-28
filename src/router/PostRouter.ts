import { Router, Request, Response, NextFunction } from 'express';
import Post from '../models/Post';
import * as multer from 'multer';

class PostRouter {
	router: Router;

	storage = multer.diskStorage({
		destination: (req: Request, file, cb: Function) => {
			cb(null, 'uploads/');
		},
		filename: (req: Request, file, cb: Function) => {
			cb(null, file.originalname);
		}
	});
	upload = multer({storage: this.storage});

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

	uploadFile(req: Request, res: Response) {
		if (!req.file) {
		    const status = res.statusCode;
		    return res.json({ status });
		  } else {
		    const status = res.statusCode;
		    return res.json({ status });
		  }
	}

	routes() {
		this.router.get('/', this.GetPosts);
		this.router.get('/:slug', this.GetPost);
		this.router.post('/', this.CreatePost);
		this.router.put('/:slug', this.UpdatePost);
		this.router.delete('/:slug', this.DeletePost);
		this.router.post('/upload', this.upload.single('fileUpload') ,this.uploadFile);
	}
}

// export
const postRoutes: PostRouter = new PostRouter();
postRoutes.routes();

export default postRoutes.router;