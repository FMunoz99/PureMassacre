package com.example.demo_lab_s2.controller;

import com.example.demo_lab_s2.domain.Song;
import com.example.demo_lab_s2.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SongController {
    
    @Autowired
    private SongRepository songRepository;
    
    @PostMapping
    public ResponseEntity<Song> createSong(@RequestBody Song song){
        Song savedSong = songRepository.save(song);
        return ResponseEntity.ok(savedSong);
    }

    @GetMapping
    public ResponseEntity<List<Song>> getAllSongs(){
        List<Song> allSongs = songRepository.findAll();
        return ResponseEntity.ok(allSongs);
    }

    @GetMapping("{id}")
    public ResponseEntity<Song> getSongById(@PathVariable Long id){
        Song song = songRepository.findById(id).get();
        return ResponseEntity.ok(song);
    }
}
