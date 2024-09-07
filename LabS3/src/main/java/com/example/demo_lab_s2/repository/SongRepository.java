package com.example.demo_lab_s2.repository;

import com.example.demo_lab_s2.domain.Song;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongRepository extends JpaRepository<Song, Long> {}
