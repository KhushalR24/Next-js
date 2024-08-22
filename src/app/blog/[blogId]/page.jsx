async function getPost(blogId) {
  const res = await fetch(
    `http://headless.local/wp-json/wp/v2/posts?slug=${blogId}`
  );
  const posts = await res.json();
  
  return posts.length > 0 ? posts[0] : null;
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.blogId);

  return (
    <div className="h-full w-full flex justify-center items-center mt-48">
      <div className="w-2/4 p-6 justify-center border border-muted rounded-md shadow-sm bg-yellow-400/20">
        <div>
          <h3 className="font-medium mb-3 text-xl">{post["title"]["rendered"]}</h3>
        </div>
        <div className="text-muted-foreground">
          <p
            className="text-sm leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: post["excerpt"]["rendered"],
            }}
          ></p>
        </div>
      </div>
    </div>
  );
}

