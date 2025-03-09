import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient, { clientConfig } from "../client.jsx";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

export default function OnePost() {
  const [postData, setPostData] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == $slug]{
          title,
          slug,
          mainImage{
            asset->{
              _id,
              url
            }
          },
          body,
          "name": author->name,
          "authorImage": author->image
        }`,
        { slug }
      )
      .then((data) => setPostData(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!postData) return <div className="text-center p-12 text-lg">Loading...</div>;

  return (
    <div className="bg-gray-200 min-h-screen p-12">
      <div className="container shadow-lg mx-auto bg-green-100 rounded-lg">
        {/* Header Section */}
        <div className="relative">
          <div className="absolute h-full w-full flex items-center justify-center p-8">
            <div className="bg-white bg-opacity-75 rounded p-12 text-center">
              <h2 className="cursive text-3xl lg:text-6xl mb-4">{postData.title}</h2>
              <div className="flex justify-center items-center text-gray-800">
                {postData.authorImage && (
                  <img
                    src={urlFor(postData.authorImage).url()}
                    className="w-10 h-10 rounded-full"
                    alt={postData.name}
                  />
                )}
                <h4 className="cursive pl-2 text-2xl">{postData.name}</h4>
              </div>
            </div>
          </div>
          {postData.mainImage && (
            <img
              className="w-full object-cover rounded-t"
              src={urlFor(postData.mainImage).url()}
              alt={postData.title}
              style={{ height: "400px" }}
            />
          )}
        </div>

        {/* Content Section */}
        <div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full">
          <BlockContent
            blocks={postData.body}
            projectId={clientConfig.projectId}
            dataset={clientConfig.dataset}
            serializers={{ types: {} }}
          />
        </div>
      </div>
    </div>
  );
}