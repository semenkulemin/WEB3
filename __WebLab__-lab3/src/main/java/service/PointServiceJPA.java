package service;

import com.google.common.collect.Lists;
import model.Point;
import repository.PointRepository;
import service.PointService;


import javax.enterprise.context.SessionScoped;
import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;
import java.util.List;


@Named("service.PointServiceJPA")
@SessionScoped
public class PointServiceJPA implements PointService, Serializable {


    @Inject
    @Named("repository.PointRepositoryJPA")
    private PointRepository pointRepository;

    @Override
    public Point create(Point point) {
        return this.pointRepository.create(point);
    }

    @Override
    public boolean delete(Point point) {
        return this.pointRepository.delete(point);
    }

    @Override
    public void deleteAll() {
        this.pointRepository.deleteAll();
    }


    @Override
    public Point findById(Long id) {
        return this.pointRepository.findById(id);
    }

    @Override
    public List<Point> findAll() {
        return Lists.newArrayList(this.pointRepository.findAll());
    }
}
