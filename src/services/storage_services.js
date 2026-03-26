import ImageKit from '@imagekit/nodejs';

//console.log(process.env.IMAGEKIT_PRIVATE_KEY);

const client = new ImageKit({
  privateKey: 'private_2szaO6PdkNm6RPBa5YVgWsSPCh0='
});


const uploadFile = async (buffer) => {
    console.log(process.env.IMAGEKIT_PRIVATE_KEY)
    const result = await client.files.upload({
    file: buffer.toString('base64'),
    fileName: "music_" + Date.now(),
    folder: "yt-complete-backend/music"
});

  return result;
};

export default uploadFile
