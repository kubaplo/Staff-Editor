import { test, expect, Page } from '@playwright/test';
import { hideCookiesBanner, dragAndDrop } from './utils';

async function placeNoteInFirstRow(page: Page, name: string) {
  await page.goto('http://localhost:3000');
  await hideCookiesBanner(page);

  const note = await page.getByTitle(name);
  await expect(note).toBeVisible();

  const staff = await page.getByLabel("Staff first row");
  await expect(staff).toBeVisible();

  await dragAndDrop(page, note, staff);

  await expect(
    page.getByLabel("Staff first row").filter({has: page.getByTitle(name)})
  ).toBeVisible();
}

async function placeNoteInSecondRow(page: Page, name: string) {
  await page.goto('http://localhost:3000');
  await hideCookiesBanner(page);

  const note = await page.getByTitle(name);
  await expect(note).toBeVisible();

  const staff = await page.getByLabel("Staff second row");
  await expect(staff).toBeVisible();

  // Needed, because the second staff line is below the viewport after the page is loaded:
  await staff.scrollIntoViewIfNeeded();

  await dragAndDrop(page, note, staff);

  await expect(
    page.getByLabel("Staff second row").filter({has: page.getByTitle(name)})
  ).toBeVisible();
}

// Placing notes on the first row:
test('whole note can be placed on the staff', async ({ page }) => {
  await placeNoteInFirstRow(page, "whole note");
});

test('half note can be placed on the staff', async ({ page }) => {
  await placeNoteInFirstRow(page, "half note");
});

test('quarter note can be placed on the staff', async ({ page }) => {
  await placeNoteInFirstRow(page, "quarter note");
});

test('eighth note can be placed on the staff', async ({ page }) => {
  await placeNoteInFirstRow(page, "eighth note");
});

test('sixteenth note can be placed on the staff', async ({ page }) => {
  await placeNoteInFirstRow(page, "sixteenth note");
});

test('thirty-second note can be placed on the staff', async ({ page }) => {
  await placeNoteInFirstRow(page, "thirty-second note");
});

test('sixty-fourth note can be placed on the staff', async ({ page }) => {
  await placeNoteInFirstRow(page, "sixty-fourth note");
});

// Placing notes on the second row:
test('whole note can be placed on the staff (second row)', async ({ page }) => {
  await placeNoteInSecondRow(page, "whole note");
});

test('half note can be placed on the staff (second row)', async ({ page }) => {
  await placeNoteInSecondRow(page, "half note");
});

test('quarter note can be placed on the staff (second row)', async ({ page }) => {
  await placeNoteInSecondRow(page, "quarter note");
});

test('eighth note can be placed on the staff (second row)', async ({ page }) => {
  await placeNoteInSecondRow(page, "eighth note");
});

test('sixteenth note can be placed on the staff (second row)', async ({ page }) => {
  await placeNoteInSecondRow(page, "sixteenth note");
});

test('thirty-second note can be placed on the staff (second row)', async ({ page }) => {
  await placeNoteInSecondRow(page, "thirty-second note");
});

test('sixty-fourth note can be placed on the staff (second row)', async ({ page }) => {
  await placeNoteInSecondRow(page, "sixty-fourth note");
});

// Placing rests on the first row:
test('whole rest can be placed on the staff', async ({ page }) => {
  await placeNoteInFirstRow(page, "whole rest");
});

test('half rest can be placed on the staff', async ({ page }) => {
  await placeNoteInFirstRow(page, "half rest");
});

test('quarter rest can be placed on the staff', async ({ page }) => {
  await placeNoteInFirstRow(page, "quarter rest");
});

test('eighth rest can be placed on the staff', async ({ page }) => {
  await placeNoteInFirstRow(page, "eighth rest");
});

test('sixteenth rest can be placed on the staff', async ({ page }) => {
  await placeNoteInFirstRow(page, "sixteenth rest");
});

test('thirty-second rest can be placed on the staff', async ({ page }) => {
  await placeNoteInFirstRow(page, "thirty-second rest");
});

test('sixty-fourth rest can be placed on the staff', async ({ page }) => {
  await placeNoteInFirstRow(page, "sixty-fourth rest");
});

// Placing rests on the second row:
test('whole rest can be placed on the staff (second row)', async ({ page }) => {
  await placeNoteInSecondRow(page, "whole rest");
});

test('half rest can be placed rest the staff (second row)', async ({ page }) => {
  await placeNoteInSecondRow(page, "half rest");
});

test('quarter rest can be placed on the staff (second row)', async ({ page }) => {
  await placeNoteInSecondRow(page, "quarter rest");
});

test('eighth rest can be placed on the staff (second row)', async ({ page }) => {
  await placeNoteInSecondRow(page, "eighth rest");
});

test('sixteenth rest can be placed on the staff (second row)', async ({ page }) => {
  await placeNoteInSecondRow(page, "sixteenth rest");
});

test('thirty-second rest can be placed on the staff (second row)', async ({ page }) => {
  await placeNoteInSecondRow(page, "thirty-second rest");
});

test('sixty-fourth rest can be placed on the staff (second row)', async ({ page }) => {
  await placeNoteInSecondRow(page, "sixty-fourth rest");
});

// Placing multiple notes/rests on the first row:
test('multiple notes and rests can be placed on the staff', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await hideCookiesBanner(page);

  const wholenote = await page.getByTitle("whole note");
  const halfnote = await page.getByTitle("half note");
  const quarternote = await page.getByTitle("quarter note");
  const wholerest = await page.getByTitle("whole rest");
  const halfrest = await page.getByTitle("half rest");
  const quarterrest = await page.getByTitle("quarter rest");

  await expect(wholenote).toBeVisible();
  await expect(halfnote).toBeVisible();
  await expect(quarternote).toBeVisible();
  await expect(wholerest).toBeVisible();
  await expect(halfrest).toBeVisible();
  await expect(quarterrest).toBeVisible();

  const staff = await page.getByLabel("Staff first row");
  await expect(staff).toBeVisible();

  await dragAndDrop(page, wholenote, staff);
  await dragAndDrop(page, halfnote, staff);
  await dragAndDrop(page, quarternote, staff);
  await dragAndDrop(page, wholerest, staff);
  await dragAndDrop(page, halfrest, staff);
  await dragAndDrop(page, quarterrest, staff);

  await expect(
    page.getByLabel("Staff first row").filter({has: await page.getByTitle("whole note")})
  ).toBeVisible();
  await expect(
    page.getByLabel("Staff first row").filter({has: page.getByTitle("half note")})
  ).toBeVisible();
  await expect(
    page.getByLabel("Staff first row").filter({has: page.getByTitle("quarter note")})
  ).toBeVisible();
  await expect(
    page.getByLabel("Staff first row").filter({has: page.getByTitle("whole rest")})
  ).toBeVisible();
  await expect(
    page.getByLabel("Staff first row").filter({has: page.getByTitle("half rest")})
  ).toBeVisible();
  await expect(
    page.getByLabel("Staff first row").filter({has: page.getByTitle("quarter rest")})
  ).toBeVisible();
});

// Placing multiple notes/rests on the second row:
test('multiple notes and rests can be placed on the staff (second row)', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await hideCookiesBanner(page);

  const wholenote = await page.getByTitle("whole note");
  const halfnote = await page.getByTitle("half note");
  const quarternote = await page.getByTitle("quarter note");
  const wholerest = await page.getByTitle("whole rest");
  const halfrest = await page.getByTitle("half rest");
  const quarterrest = await page.getByTitle("quarter rest");
  
  await expect(wholenote).toBeVisible();
  await expect(halfnote).toBeVisible();
  await expect(quarternote).toBeVisible();
  await expect(wholerest).toBeVisible();
  await expect(halfrest).toBeVisible();
  await expect(quarterrest).toBeVisible();

  const staff = await page.getByLabel("Staff second row");
  await expect(staff).toBeVisible();

  await staff.scrollIntoViewIfNeeded();

  await dragAndDrop(page, wholenote, staff);
  await dragAndDrop(page, halfnote, staff);
  await dragAndDrop(page, quarternote, staff);
  await dragAndDrop(page, wholerest, staff);
  await dragAndDrop(page, halfrest, staff);
  await dragAndDrop(page, quarterrest, staff);

  await expect(
    page.getByLabel("Staff second row").filter({has: await page.getByTitle("whole note")})
  ).toBeVisible();
  await expect(
    page.getByLabel("Staff second row").filter({has: page.getByTitle("half note")})
  ).toBeVisible();
  await expect(
    page.getByLabel("Staff second row").filter({has: page.getByTitle("quarter note")})
  ).toBeVisible();
  await expect(
    page.getByLabel("Staff second row").filter({has: page.getByTitle("whole rest")})
  ).toBeVisible();
  await expect(
    page.getByLabel("Staff second row").filter({has: page.getByTitle("half rest")})
  ).toBeVisible();
  await expect(
    page.getByLabel("Staff second row").filter({has: page.getByTitle("quarter rest")})
  ).toBeVisible();
});

// Clearing staff
test('all notes and rests can be removed from staff', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await hideCookiesBanner(page);

  const wholenote = await page.getByTitle("whole note");
  const wholerest = await page.getByTitle("whole rest");

  await expect(wholenote).toBeVisible();
  await expect(wholerest).toBeVisible();

  const staff = await page.getByLabel("Staff first row");
  await expect(staff).toBeVisible();

  await dragAndDrop(page, wholenote, staff);
  await dragAndDrop(page, wholerest, staff);

  await expect(
    page.getByLabel("Staff first row").filter({has: await page.getByTitle("whole note")})
  ).toBeVisible();
  await expect(
    page.getByLabel("Staff first row").filter({has: page.getByTitle("whole rest")})
  ).toBeVisible();

  const clearButton = await page.getByText("Clear whole staff");
  await clearButton.click()

  await expect(
    page.getByLabel("Staff first row").filter({has: await page.getByTitle("whole note")})
  ).not.toBeVisible();
  await expect(
    page.getByLabel("Staff first row").filter({has: page.getByTitle("whole rest")})
  ).not.toBeVisible();
});

// Removing single note from staff
test('specific notes can be removed from staff', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await hideCookiesBanner(page);

  const wholenote = await page.getByTitle("whole note");
  await expect(wholenote).toBeVisible();

  const staff = await page.getByLabel("Staff first row");
  await expect(staff).toBeVisible();

  const trash = await page.getByTitle("Delete note/rest");
  await expect(trash).toBeVisible();

  await dragAndDrop(page, wholenote, staff);

  const placedNote = await page.getByLabel("Staff first row").getByTitle("whole note")
  await expect(placedNote).toBeVisible();

  await dragAndDrop(page, placedNote, trash);
  await expect(page.getByLabel("Staff first row").filter({has: page.getByTitle("whole note")})).not.toBeVisible();
});

// Removing single rest from staff
test('specific rests can be removed from staff', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await hideCookiesBanner(page);

  const wholerest = await page.getByTitle("whole rest");
  await expect(wholerest).toBeVisible();

  const staff = await page.getByLabel("Staff first row");
  await expect(staff).toBeVisible();

  const trash = await page.getByTitle("Delete note/rest");
  await expect(trash).toBeVisible();

  await dragAndDrop(page, wholerest, staff);

  const placedNote = await page.getByLabel("Staff first row").getByTitle("whole rest")
  await expect(placedNote).toBeVisible();

  await dragAndDrop(page, placedNote, trash);
  await expect(page.getByLabel("Staff first row").filter({has: page.getByTitle("whole rest")})).not.toBeVisible();
});