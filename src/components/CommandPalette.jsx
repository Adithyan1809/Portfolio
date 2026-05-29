import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { useSoundEffects } from '../hooks/useSoundEffects';
import './CommandPalette.css';

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { playHover, playType, playSwoosh, playLaser } = useSoundEffects();

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => {
          if (!open) playSwoosh(); // Swoosh when opened
          return !open;
        });
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [playSwoosh]);

  if (!open) return null;

  const handleSelect = (action) => {
    playLaser();
    action();
    setOpen(false);
  };

  return (
    <div className="cmdk-overlay" onClick={() => setOpen(false)}>
      <div className="cmdk-dialog" onClick={(e) => e.stopPropagation()}>
        <Command>
          <Command.Input 
            placeholder="Type a command or search... (Esc to close)" 
            autoFocus 
            onKeyDown={(e) => {
              if(e.key.length === 1 || e.key === 'Backspace') playType();
            }}
          />
          <Command.List>
            <Command.Empty>No results found.</Command.Empty>

            <Command.Group heading="Navigation">
              <Command.Item onSelect={() => handleSelect(() => navigate('/'))} onMouseEnter={playHover}>
                Home
              </Command.Item>
              <Command.Item onSelect={() => handleSelect(() => navigate('/#about'))} onMouseEnter={playHover}>
                About
              </Command.Item>
              <Command.Item onSelect={() => handleSelect(() => navigate('/#experience'))} onMouseEnter={playHover}>
                Experience
              </Command.Item>
              <Command.Item onSelect={() => handleSelect(() => navigate('/#skills'))} onMouseEnter={playHover}>
                Skills
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Case Studies">
              <Command.Item onSelect={() => handleSelect(() => navigate('/projects/resumepilot'))} onMouseEnter={playHover}>
                Project: ResumePilot
              </Command.Item>
              <Command.Item onSelect={() => handleSelect(() => navigate('/projects/project-iris'))} onMouseEnter={playHover}>
                Project: Project IRIS
              </Command.Item>
              <Command.Item onSelect={() => handleSelect(() => navigate('/projects/mustering-system'))} onMouseEnter={playHover}>
                Project: Mustering System
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Socials">
              <Command.Item onSelect={() => handleSelect(() => window.open('https://github.com/Adithyan1809', '_blank'))} onMouseEnter={playHover}>
                GitHub
              </Command.Item>
              <Command.Item onSelect={() => handleSelect(() => window.open('https://linkedin.com/in/adithyan-prakash', '_blank'))} onMouseEnter={playHover}>
                LinkedIn
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
};

export default CommandPalette;
