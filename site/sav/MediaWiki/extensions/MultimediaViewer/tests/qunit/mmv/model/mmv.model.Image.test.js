/*
 * This file is part of the MediaWiki extension MediaViewer.
 *
 * MediaViewer is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * MediaViewer is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with MediaViewer.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( mw ) {
	QUnit.module( 'mmv.model.Image', QUnit.newMwEnvironment() );

	QUnit.test( 'Image model constructor sanity check', 19, function ( assert ) {
		var
			title = mw.Title.newFromText( 'File:Foobar.jpg' ),
			size = 100,
			width = 10,
			height = 15,
			mime = 'image/jpeg',
			url = 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Foobar.jpg',
			descurl = 'https://commons.wikimedia.org/wiki/File:Foobar.jpg',
			repo = 'wikimediacommons',
			user = 'Kaldari',
			datetime = '2011-07-04T23:31:14Z',
			origdatetime = '2010-07-04T23:31:14Z',
			description = 'This is a test file.',
			source = 'WMF',
			author = 'Ryan Kaldari',
			permission = 'only use for good, not evil',
			license = new mw.mmv.model.License( 'cc0' ),
			latitude = 39.12381283,
			longitude = 100.983829,
			imageData = new mw.mmv.model.Image(
				title, size, width, height, mime, url,
				descurl, repo, user, datetime, origdatetime,
				description, source, author, license, permission,
				latitude, longitude );

		assert.strictEqual( imageData.title, title, 'Title is set correctly' );
		assert.strictEqual( imageData.size, size, 'Size is set correctly' );
		assert.strictEqual( imageData.width, width, 'Width is set correctly' );
		assert.strictEqual( imageData.height, height, 'Height is set correctly' );
		assert.strictEqual( imageData.mimeType, mime, 'MIME type is set correctly' );
		assert.strictEqual( imageData.url, url, 'URL for original image is set correctly' );
		assert.strictEqual( imageData.descriptionUrl, descurl, 'URL for image description page is set correctly' );
		assert.strictEqual( imageData.repo, repo, 'Repository name is set correctly' );
		assert.strictEqual( imageData.lastUploader, user, 'Name of last uploader is set correctly' );
		assert.strictEqual( imageData.uploadDateTime, datetime, 'Date and time of last upload is set correctly' );
		assert.strictEqual( imageData.creationDateTime, origdatetime, 'Date and time of original upload is set correctly' );
		assert.strictEqual( imageData.description, description, 'Description is set correctly' );
		assert.strictEqual( imageData.source, source, 'Source is set correctly' );
		assert.strictEqual( imageData.author, author, 'Author is set correctly' );
		assert.strictEqual( imageData.license, license, 'License is set correctly' );
		assert.strictEqual( imageData.permission, permission, 'Permission is set correctly' );
		assert.strictEqual( imageData.latitude, latitude, 'Latitude is set correctly' );
		assert.strictEqual( imageData.longitude, longitude, 'Longitude is set correctly' );
		assert.ok( imageData.thumbUrls, 'Thumb URL cache is set up properly' );
	} );

	QUnit.test( 'hasCoords()', 2, function ( assert ) {
		var
			firstImageData = new mw.mmv.model.Image(
				mw.Title.newFromText( 'File:Foobar.pdf.jpg' ),
				10, 10, 10, 'image/jpeg', 'http://example.org', 'http://example.com',
				'example', 'tester', '2013-11-10', '2013-11-09', 'Blah blah blah',
				'A person', 'Another person', 'CC-BY-SA-3.0', 'Permitted'
			),
			secondImageData = new mw.mmv.model.Image(
				mw.Title.newFromText( 'File:Foobar.pdf.jpg' ),
				10, 10, 10, 'image/jpeg', 'http://example.org', 'http://example.com',
				'example', 'tester', '2013-11-10', '2013-11-09', 'Blah blah blah',
				'A person', 'Another person', 'CC-BY-SA-3.0', 'Permitted',
				'39.91820938', '78.09812938'
			);

		assert.strictEqual( firstImageData.hasCoords(), false, 'No coordinates present means hasCoords returns false.' );
		assert.strictEqual( secondImageData.hasCoords(), true, 'Coordinates present means hasCoords returns true.' );
	} );

	QUnit.test( 'parseExtmeta()', 8, function ( assert ) {
		var Image = mw.mmv.model.Image,
			stringData = { value: 'foo' },
			floatData = { value: 1.23 },
			floatStringData = { value: '1.23' },
			listDataEmpty = {value: '' },
			listDataSingle = {value: 'foo' },
			listDataMultiple = {value: 'foo|bar|baz' },
			missingData;

		assert.strictEqual( Image.parseExtmeta( stringData, 'string' ), 'foo',
			'Extmeta string parsed correctly.' );
		assert.strictEqual( Image.parseExtmeta( floatData, 'float' ), 1.23,
			'Extmeta float parsed correctly.' );
		assert.strictEqual( Image.parseExtmeta( floatStringData, 'float' ), 1.23,
			'Extmeta float string parsed correctly.' );
		assert.deepEqual( Image.parseExtmeta( listDataEmpty, 'list' ), [],
			'Extmeta empty list parsed correctly.' );
		assert.deepEqual( Image.parseExtmeta( listDataSingle, 'list' ), ['foo'],
			'Extmeta list with single element parsed correctly.' );
		assert.deepEqual( Image.parseExtmeta( listDataMultiple, 'list' ), ['foo', 'bar', 'baz'],
			'Extmeta list with multipleelements parsed correctly.' );
		assert.strictEqual( Image.parseExtmeta( missingData, 'string' ), undefined,
			'Extmeta missing data parsed correctly.' );

		try {
			Image.parseExtmeta( stringData, 'strong' );
		} catch ( e ) {
			assert.ok( e, 'Exception is thrown on invalid argument' );
		}
	} );

}( mediaWiki ) );