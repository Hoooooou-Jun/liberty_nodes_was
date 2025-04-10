// import { Test, TestingModule } from '@nestjs/testing';
// import { CommentService } from './comment.service.js';
// import * as anchor from '@coral-xyz/anchor';
// import createAnchorProvider from '@providers/anchor.provider.js';
// import decodeUTF8Array from '@utils/decodeUTF8Array.js';
// import { LibertyNodes } from '@/types/liberty_nodes.js';
// import IDL from '@configs/liberty_nodes.json';

// jest.mock('@providers/anchor.provider.js');
// jest.mock('@utils/decodeUTF8Array.js');

// describe('CommentService', () => {
//   let service: CommentService;
//   let mockProgram: any;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [CommentService],
//     }).compile();

//     service = module.get<CommentService>(CommentService);

//     // Mock Anchor Provider
//     const mockProvider = createAnchorProvider as jest.Mock;
//     mockProvider.mockReturnValue({});

//     // Mock Anchor Program and Account Data
//     mockProgram = {
//       account: {
//         commentAccount: {
//           all: jest.fn().mockResolvedValue([
//             {
//               account: {
//                 authority: { toString: jest.fn().mockReturnValue('mock-authority') },
//                 content: new Uint8Array([104, 101, 108, 108, 111]), // 'hello'
//                 url: new Uint8Array([119, 119, 119, 46, 103, 111, 111, 103, 108, 101, 46, 99, 111, 109]), // 'www.google.com'
//                 vote: { toString: jest.fn().mockReturnValue('100') },
//               },
//             },
//           ]),
//         },
//       },
//     };

//     // Mock anchor.Program to return mockProgram
//     jest.spyOn(anchor, 'Program').mockImplementation(() => mockProgram);
//   });

//   it('should fetch comment data successfully', async () => {
//     // Mock decodeUTF8Array to return proper strings
//     (decodeUTF8Array as jest.Mock).mockImplementation((arr) => {
//       if (arr[0] === 104) return 'hello'; // content
//       if (arr[0] === 119) return 'www.google.com'; // url
//     });

//     const result = await service.getComment();

//     expect(result).toEqual('hello world');
//     expect(mockProgram.account.commentAccount.all).toHaveBeenCalled();
//     expect(decodeUTF8Array).toHaveBeenCalledWith(new Uint8Array([104, 101, 108, 108, 111])); // 'hello'
//     expect(decodeUTF8Array).toHaveBeenCalledWith(new Uint8Array([119, 119, 119, 46, 103, 111, 111, 103, 108, 101, 46, 99, 111, 109])); // 'www.google.com'
//   });

//   it('should handle errors when fetching comment data', async () => {
//     // Mock the all() function to throw an error
//     mockProgram.account.commentAccount.all.mockRejectedValue(new Error('Fetching error'));

//     await expect(service.getComment()).rejects.toThrow('Fetching error');
//   });
// });
