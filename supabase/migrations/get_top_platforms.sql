CREATE OR REPLACE FUNCTION get_top_platforms(start_time TIMESTAMPTZ DEFAULT '2000-01-01'::TIMESTAMPTZ, item_limit INT DEFAULT 3)
RETURNS TABLE(platform TEXT, view_count BIGINT)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    CASE 
      WHEN user_agent ILIKE '%youtube%' THEN '유튜브'
      WHEN user_agent ILIKE '%instagram%' THEN '인스타그램'
      WHEN user_agent ILIKE '%KAKAOTALK%' THEN '카카오톡'
      WHEN user_agent ILIKE '%Naver%' THEN '네이버'
      WHEN user_agent ILIKE '%Edg/%' OR user_agent ILIKE '%Edge/%' THEN '엣지'
      WHEN user_agent ILIKE '%Chrome/%' THEN '크롬'
      WHEN user_agent ILIKE '%Safari/%' THEN '기본 브라우저'
      ELSE '기타'
    END || 
    CASE 
      WHEN user_agent ILIKE '%Mobile%' OR user_agent ILIKE '%Android%' OR user_agent ILIKE '%iPhone%' THEN '(폰)'
      ELSE '(PC)'
    END as platform,
    COUNT(*) as view_count
  FROM page_views
  WHERE visited_at >= start_time AND user_agent IS NOT NULL
  GROUP BY platform
  ORDER BY view_count DESC
  LIMIT item_limit;
END;
$$;
