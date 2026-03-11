CREATE OR REPLACE FUNCTION get_visitor_chart_data(time_unit TEXT, start_time TIMESTAMPTZ, end_time TIMESTAMPTZ DEFAULT NOW())
RETURNS TABLE(label TEXT, views BIGINT)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF time_unit = 'hour' THEN
    RETURN QUERY
    SELECT 
      to_char(visited_at AT TIME ZONE 'Asia/Seoul', 'HH24:00') as label, 
      COUNT(*) as views
    FROM page_views
    WHERE visited_at >= start_time AND visited_at <= end_time
    GROUP BY label
    ORDER BY label ASC;
  ELSIF time_unit = 'day' THEN
    RETURN QUERY
    SELECT 
      to_char(visited_at AT TIME ZONE 'Asia/Seoul', 'DD일') as label, 
      COUNT(*) as views
    FROM page_views
    WHERE visited_at >= start_time AND visited_at <= end_time
    GROUP BY label
    ORDER BY MIN(visited_at) ASC;
  ELSIF time_unit = 'month' THEN
    RETURN QUERY
    SELECT 
      to_char(visited_at AT TIME ZONE 'Asia/Seoul', 'YYYY년 MM월') as label, 
      COUNT(*) as views
    FROM page_views
    WHERE visited_at >= start_time AND visited_at <= end_time
    GROUP BY label
    ORDER BY MIN(visited_at) ASC;
  ELSE
    RETURN QUERY
    SELECT 
      to_char(visited_at AT TIME ZONE 'Asia/Seoul', 'YYYY-MM-DD') as label, 
      COUNT(*) as views
    FROM page_views
    WHERE visited_at >= start_time AND visited_at <= end_time
    GROUP BY label
    ORDER BY MIN(visited_at) ASC;
  END IF;
END;
$$;
