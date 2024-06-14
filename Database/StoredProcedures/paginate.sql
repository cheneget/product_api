CREATE PROCEDURE paginate
  @offset INT,
  @limit INT
AS
BEGIN
  SELECT *
  FROM (
      SELECT *,
             ROW_NUMBER() OVER (ORDER BY id) AS RowNum
      FROM Product
  ) AS RowNumbers
  WHERE RowNum > @offset
    AND RowNum <= @offset + @limit;
END;