import { Router, Request, Response } from 'express';
import { DiaryModel } from '../models/diary.model';

const router = Router();

// 전체 조회 GET /api/diaries
router.get('/', async (req: Request, res: Response) => {
  try {
    const diaries = await DiaryModel.find().sort({ date: -1 });
    res.json(diaries);
  } catch (err) {
    res.status(500).json({ message: '조회 실패', err });
  }
});

// 월별 조회 GET /api/diaries?year=2026&month=2
router.get('/monthly', async (req: Request, res: Response) => {
  try {
    const { year, month } = req.query;
    const start = new Date(Number(year), Number(month), 1);
    const end = new Date(Number(year), Number(month) + 1, 0);
    const diaries = await DiaryModel.find({
      date: { $gte: start, $lte: end }
    }).sort({ date: 1 });
    res.json(diaries);
  } catch (err) {
    res.status(500).json({ message: '월별 조회 실패', err });
  }
});

// 저장 POST /api/diaries
router.post('/', async (req: Request, res: Response) => {
  try {
    const diary = new DiaryModel(req.body);
    const saved = await diary.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: '저장 실패', err });
  }
});

// 수정 PUT /api/diaries/:id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updated = await DiaryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }  // 수정된 데이터 반환
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: '수정 실패', err });
  }
});

// 삭제 DELETE /api/diaries/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await DiaryModel.findByIdAndDelete(req.params.id);
    res.json({ message: '삭제 완료' });
  } catch (err) {
    res.status(500).json({ message: '삭제 실패', err });
  }
});

export default router;