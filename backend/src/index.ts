import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import diaryRouter from './routes/diary.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || '';

// 미들웨어
app.use(cors());
app.use(express.json());

// MongoDB 연결
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB 연결 성공!'))
  .catch((err) => console.error('❌ MongoDB 연결 실패:', err));

// 테스트용 라우트
app.get('/api/health', (req, res) => {
  res.json({ message: '서버 정상 작동중! 🚀' });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버 실행중 http://localhost:${PORT}`);
});

app.use('/api/diaries', diaryRouter); 