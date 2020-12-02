import {getBlogBySlug} from 'lib/api';
export default async function enablePreview(req, res) {
    if(req.query.secret !== process.env.SANITY_PREVIEW_SECRET){
        return res.status(401).json({message: 'Invalid tokens'})
    }
    const blog = await getBlogBySlug(req.query.slug);
    if(!blog) {
        return res.status(401).json({message: 'Invalid Slug'});
    }
    res.setPreviewData({});
    res.writeHead(307, {Location: `/blogs/${blog.slug}` });
    res.end();
}