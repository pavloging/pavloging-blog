import AlbumIcon from "@mui/icons-material/Album";
import styles from "./Music.module.scss";
import { Button, Slider, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { VolumeDown, VolumeUp } from "@mui/icons-material";
import { useState } from "react";
import { musicApi } from "../../musicApi";
import { useAudio } from "../../hook/useAudio";

export const Music = () => {
  const [volume, setVolume] = useState(30);
  const [menuHide, setMenuHide] = useState(false);

  const [proof, setProof] = useState(
    "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/a2/2e/0e/a22e0eef-0e7a-16b5-4579-38e48b7afcc9/mzaf_17042347760946713379.plus.aac.ep.m4a"
  );

  const audio = useAudio(proof, {
    volume: volume / 100,
    playbackRate: 1,
  });

  const viewAudio = (src) => {
    console.log(src);
    setProof(src);
    setMenuHide(true);
  };

  return (
    <div className={styles.tags}>
      <h1 className={styles.title}>Music</h1>

      {menuHide && (
        <div className={styles.menuAudio}>
          <Button onClick={() => audio.play(audio)}>Play Sound</Button>
          <Button onClick={() => audio.pause(audio)}>Stop Sound</Button>

          <Box sx={{ width: 200 }}>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <VolumeDown />
              <Slider
                aria-label="Volume"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
              />
              <VolumeUp />
            </Stack>
          </Box>
        </div>
      )}

      <div className={styles.music}>
        {musicApi.map((el) => (
          <div
            key={el.id}
            className={styles.card}
            onClick={() => viewAudio(el.audioUrl)}
          >
            <div className={styles.icon}>
              <AlbumIcon className={styles.icon__ico} />
            </div>
            <img src={el.posterUrl} alt="posterUrl" />
            <p>{el.title}</p>
            <span>{el.author}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
