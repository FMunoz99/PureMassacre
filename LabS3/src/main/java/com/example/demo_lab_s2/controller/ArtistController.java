package com.example.demo_lab_s2.controller;

import com.example.demo_lab_s2.domain.Artist;
import com.example.demo_lab_s2.dto.GetArtistResponseDto;
import com.example.demo_lab_s2.dto.NewArtistRequestDto;
import com.example.demo_lab_s2.exceptions.ResourceNotFoundException;
import com.example.demo_lab_s2.repository.ArtistRepository;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//import com.example.demo_lab_s2

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/artist")
public class ArtistController {
    @Autowired
    ArtistRepository artistRepository;
    @Autowired
    private ModelMapper modelMapper;

    @PostMapping
    public ResponseEntity<Artist> createArtist(@Valid @RequestBody NewArtistRequestDto artist){
        Artist newArtist = new Artist();
        modelMapper.map(artist, newArtist);
        Artist savedArtist = artistRepository.save(newArtist);
        URI location = URI.create("/artist/" + savedArtist.getId());
        return ResponseEntity.created(location).body(savedArtist);
    }

    @GetMapping
    public ResponseEntity<List<Artist>> getAllArtists(){
        List<Artist> allArtists = artistRepository.findAll();
        return ResponseEntity.ok(allArtists);
    }

    @GetMapping("{id}")
    public ResponseEntity<GetArtistResponseDto> getArtistById(@PathVariable Long id){
        Artist artist = artistRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Artist with id " + id + " not found"));

        GetArtistResponseDto artistResponse = new GetArtistResponseDto();
        modelMapper.map(artist, artistResponse);

        artist.getSongs().forEach(song -> artistResponse.getSongIdList().add(song.getId()));

        return ResponseEntity.ok(artistResponse);
    }



    @GetMapping("/test")
    public ResponseEntity<String> getApi(){
        String respuesta = "Hola";
        return ResponseEntity.ok(respuesta);
    }
}
