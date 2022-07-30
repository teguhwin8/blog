import React, { useState, useEffect } from 'react'
import Link from "next/link"
import * as contentful from "contentful";

export default function Topic() {
    const [isLoading, setIsLoading] = useState(false);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const client = contentful.createClient({
            space: 'cjrteoqcujc9',
            accessToken: 'Nw-tb4N6lpiz-inO6G501wmkjb27S1PuI5aNYdhfzpI',
        });

        client.getTags().then((response) => {
            setTags(response.items);
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            {tags.length > 0 ? (
                <div className="py-8">
                    <h3 className="text-md font-bold mb-4">Topik Terkait</h3>
                    <div className="flex flex-wrap">
                        {tags.map((tag, index) => (
                            <Link key={index} href={'tag/' + tag.name}>
                                <a className="tag mb-3 mr-3">{tag.name}</a>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="py-8">
                    <div className="mb-4 h-[100px] animate-pulse bg-gray-200 rounded-lg"></div>
                </div>
            )}
        </>
    )
}