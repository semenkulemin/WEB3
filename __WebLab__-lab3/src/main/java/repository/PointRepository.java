package repository;

import model.Point;

import java.util.List;

public interface PointRepository {
    public Point create(Point point);
    public boolean delete(Point point);
    public void deleteAll();
    public List<Point> findAll();
    public Point findById(Long id);
}
