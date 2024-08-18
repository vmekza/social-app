'use client';

import React, { useState, useRef } from 'react';
import css from '@/styles/postForm.module.css';
import Block from '@/components/Block/Block';
import { Avatar, Flex, Input, Image, Button, Tooltip } from 'antd';
import { useUser } from '@clerk/nextjs';
import { Icon } from '@iconify/react';

const PostForm = () => {
  const { user } = useUser();
  const [post, setPost] = useState('');
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert('File is too large. Please upload a file smaller than 5MB');
      return;
    }

    if (
      (file && file.type.startsWith('image/')) ||
      file.type.startsWith('video/')
    ) {
      setFile(file.type.split('/')[0]);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedFile(reader.result);
      };
    }
  };

  const handleDeleteFile = (file) => {
    setSelectedFile(null);
    setFile(null);
  };
  return (
    <>
      <div className={css.wrapper}>
        <Block className={css.post_form_container}>
          <Flex style={{ width: '100%' }} gap={'1rem'}>
            <Avatar
              src={user?.imageUrl}
              style={{
                width: '2.6rem',
                height: '2.6rem',
                boxShadow: 'var(--shadow)',
              }}
            />
            <Input.TextArea
              placeholder='Share your progress, your thoughts, or your next challenge...'
              style={{ height: 80, resize: 'none', flex: 1 }}
              value={post}
              onChange={(e) => setPost(e.target.value)}
            ></Input.TextArea>
          </Flex>
          {file && (
            <div class={css.preview_container}>
              <Button
                type='text'
                className={css.preview_delete}
                style={{
                  position: 'absolute',
                  background: '#7f7f7f',
                  width: '2rem',
                  height: '2rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 0,
                  border: 'none',
                }}
                onClick={handleDeleteFile}
              >
                <Icon
                  icon={'streamline:delete-1-solid'}
                  width={'1.2rem'}
                ></Icon>
              </Button>
              {file === 'image' && (
                <Image
                  src={selectedFile}
                  className={css.preview_file}
                  alt='preview of image'
                  height={'350px'}
                  width={'100%'}
                />
              )}
              {file === 'video' && (
                <video
                  src={selectedFile}
                  className={css.preview_file}
                  controls
                  height={'350px'}
                />
              )}
            </div>
          )}

          <Flex
            className={css.post_form_btn}
            align='center'
            justify='space-between'
          >
            <div
              className={`${css.btn_container} ${file ? css.no_margin : ''}`}
            >
              <Button
                type='text'
                style={{ background: 'transparent', paddingRight: '0px' }}
                onClick={() => imageInputRef.current.click()}
              >
                <Tooltip title='Image'>
                  <Icon
                    icon={'material-symbols:image-outline'}
                    width={'1.5rem'}
                  ></Icon>
                </Tooltip>
              </Button>
              <Button
                type='text'
                style={{ background: 'transparent' }}
                onClick={() => videoInputRef.current.click()}
              >
                <Tooltip title='Video'>
                  <Icon icon={'mingcute:video-line'} width={'1.5rem'}></Icon>
                </Tooltip>
              </Button>
            </div>
            <Button
              type='primary'
              className={css.btn_share}
              style={{
                background: 'var(--color-btn)',
                color: 'black',
                fontWeight: 'bold',
                marginLeft: 'auto',
              }}
            >
              Share
            </Button>
          </Flex>
        </Block>
      </div>

      <input
        type='file'
        accept='image/'
        multiple={false}
        style={{ display: 'none' }}
        ref={imageInputRef}
        onChange={(e) => handleFileChange(e)}
      />
      <input
        type='file'
        accept='video/'
        multiple={false}
        style={{ display: 'none' }}
        ref={videoInputRef}
        onChange={(e) => handleFileChange(e)}
      />
    </>
  );
};

export default PostForm;
