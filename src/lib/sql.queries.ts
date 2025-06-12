export const getPostCounts = `
  SELECT type, COUNT(*) as count 
    FROM interactions 
    WHERE post_id = $post_id
    GROUP BY type;
`;

export const mutatePost = `
  INSERT 
    INTO interactions (type, post_id, ip_addr)
    VALUES ($type, $post_id, $ip_addr);
`;
